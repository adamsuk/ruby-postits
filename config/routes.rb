Rails.application.routes.draw do
  scope 'api' do
    scope 'v1' do
      resources :postit
    end
  end
  root 'root#index'
end
