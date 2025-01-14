class TestsController < ApplicationController
  before_action :set_test, only: %i[step1 step2 step3 create update]

  def new
    session[:test_id] = nil
    @test = Test.new
    @test.respondents.build # Add an empty respondent for the form
    redirect_to step1_tests_path
  end

  def step1
    @current_step = 1
    @test ||= Test.new(user: current_user)

    if request.post? # Handle the POST request for saving step 1 data
      @test.assign_attributes(test_params)
      if @test.save
        session[:test_id] = @test.id # Save the new test ID in the session
        redirect_to step2_tests_path, notice: "Step 1 completed successfully!"
      else
        render :step1
      end
    end
  end

  def step2
    @current_step = 2
    @fields = [
      { field_name: "age", field_type: "integer" },
      { field_name: "city", field_type: "string" },
      { field_name: "first_name", field_type: "string" },
      { field_name: "last_name", field_type: "string" },
      { field_name: "id_number", field_type: "string" },
      { field_name: "organization_name", field_type: "string" },
      { field_name: "postal_code", field_type: "string" }
    ]

    if request.post?

      params.dig("test","respondents_attributes").reject(&:blank?).each do |respondent|
        respondents_attributes = JSON.parse(respondent)
        @test.respondents.new(respondents_attributes)
      end
      
      @test.assign_attributes(test_params)
      if @test.save
        redirect_to step3_tests_path, notice: "Step 2 completed successfully!"
      else
        render :step2
      end
    else
      redirect_to step1_tests_path, alert: "Please complete Step 1 first." unless @test&.persisted?
    end
  end

  def step3
    @current_step = 3
    if request.post?
      @test.assign_attributes(test_params)
      if @test.save
        redirect_to root_path, notice: "Test created successfully!"
      else
        render :step3
      end
    else
      redirect_to step2_tests_path, alert: "Please complete Step 2 first." unless @test&.persisted?
    end
  end

  def create
    if @test.update(test_params)
      session.delete(:test_id) # Clear the session after completion
      redirect_to root_path, notice: "Test created successfully!"
    else
      render :step3
    end
  end

  def update
    if @test.update(test_params)
      redirect_to root_path, notice: "Test updated successfully!"
    else
      render :step3
    end
  end

  def destroy
    @test = Test.find(params[:id])
    if @test.destroy
      redirect_to tests_path, notice: "Test was successfully deleted."
    else
      redirect_to tests_path, alert: "Failed to delete the test."
    end
  end

  private

  def set_test
    @test = Test.find_by(id: session[:test_id])
  end

  def test_params
    params.require(:test).permit(
      :test_type, :user_id, :instruction, :description, :duration, :test_language,
      :access_type, :leaving_page, :leaving_page_count, :consent, :consent_accepted, :mandatory,
      respondents_attributes: [
        :field_name, :field_value, :mandatory
      ]
    )
  end
end
