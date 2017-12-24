Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, except: [:edit, :new]
      resources :words, only: [:index, :show]
      resources :attempts, except: [:edit, :new]
    end
  end
end
