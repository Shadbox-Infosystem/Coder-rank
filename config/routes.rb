Rails.application.routes.draw do
  namespace :api do
    get 'users/current_user'
  end
  get 'home/index'
  devise_for :users, controllers: { 
    registrations: 'users/registrations',
    sessions: 'users/sessions',
  }

  post '/api/csrf_token', to: ->(env) { [200, {}, [{ csrfToken: env['HTTP_X_CSRF_TOKEN'] || SecureRandom.hex(32) }]] }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api, defaults: { format: :json } do
    get 'current_user', to: 'users#current_user'
  end

  # Defines the root path route ("/")
  # root "posts#index"
  root to: 'home#index'
  resources :tests, only: [:new, :create, :update, :destroy] do
    collection do
      get :step1
      post :step1
      get :step2
      post :step2
      get :step3
      post :step3
    end
  end

end
