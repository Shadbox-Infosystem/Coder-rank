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
  
    # If there is no test object, try to find it from the session
    @test ||= Test.find_by(id: session[:test_id]) || Test.new(user: current_user)
  
    # Check if there is a valid test object
    unless @test.persisted?
      redirect_to step1_tests_path, alert: "Please complete Step 1 first." 
      return
    end
  
    # Handle POST request
    if request.post?
      respondents_attributes = params.dig("test", "respondents")
      
      if respondents_attributes.present?
        # Assuming respondents are directly passed as JSON objects
        respondents_attributes.each do |respondent|
          parsed_respondent = JSON.parse(respondent)
          @test.respondents.build(parsed_respondent)
        end
      end
  
      @test.assign_attributes(test_params)
      if @test.save
        redirect_to step3_tests_path, notice: "Step 2 completed successfully!"
      else
        render :step2
      end
    end
  end

  def step3
    @current_step = 3
    @test = Test.find_by(id: params[:id])

    if @test.nil?
      render json: { error: 'Test not found' }, status: 404
      return
    end

    @test.assign_attributes(test_params)
    if @test.save
      render json: @test, status: :ok
    else
      render json: @test.errors, status: :unprocessable_entity
    end
  end


  def create
    if @test.update(test_params)
      session.delete(:test_id)
      redirect_to root_path, notice: "Test created successfully!"
    else
      render :step3
    end
  end

  def update
    @test = Test.find_by(id: params[:id])
  
    if @test.nil?
      # Handle the case when the test is not found
      redirect_to '/tests/step1', alert: 'Test not found'
      return
    end
  
    if @test.update(test_params)
      redirect_to next_step_path(@test) # assuming there's logic for the next step
    else
      render :edit # render the edit page if there are validation errors
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
