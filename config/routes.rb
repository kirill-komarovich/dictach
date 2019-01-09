# frozen_string_literal: true

Rails.application.routes.draw do
  constraints format: :json do
    devise_for :users,
              skip: %i[password]
    resources :authentication_checks, only: :index
    get 'home', to: 'home#index'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
