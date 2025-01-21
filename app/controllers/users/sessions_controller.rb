# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  protect_from_forgery
  respond_to :json

  def create
    super
  end

  def destroy
    super
  end
end
