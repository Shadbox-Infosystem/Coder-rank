class HomeController < ApplicationController
  # before_action :authenticate_user!

  def index
    @data = Test.all
    respond_to do |format|
      format.html # Render HTML for non-JSON requests
      format.json { render json: @data }
    end
  end
end
