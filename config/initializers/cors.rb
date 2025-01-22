# config/initializers/cors.rb

# Use rack-cors middleware to handle CORS requests
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:5000', 'https://your-frontend-app.com'  # Replace with the domain of your frontend app

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options],
      credentials: true
  end
end
  