# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             defaults: { format: :json },
             skip: %i[password]
  get 'home', to: 'home#index'

  resources :namespaces, defaults: { format: :json } do
    resources :dictionaries, defaults: { format: :json }, module: :namespaces
  end
end
