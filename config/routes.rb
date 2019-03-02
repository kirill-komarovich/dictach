# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             defaults: { format: :json },
             skip: %i[password]
  resources :authentication_checks, only: :index, defaults: { format: :json }
  get 'home', to: 'home#index', defaults: { format: :json }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'home', to: 'home#index'

  resources :tags, defaults: { format: :json }, except: :show do
    resources :dictionaries, defaults: { format: :json }
  end

  resources :dictionaries, defaults: { format: :json } do
    resources :words, defaults: { format: :json }, module: :dictionaries
  end
end
