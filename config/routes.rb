Rails.application.routes.draw do
  scope 'api' do
    scope 'v1' do
      resources :postit
      resources :workspace, only: [:show, :create]
    end
  end
  # get ':session_id', to: 'root#index'
  # root 'root#index'
end
