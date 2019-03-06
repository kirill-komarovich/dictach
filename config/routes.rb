# frozen_string_literal: true

Rails.application.routes.draw do

  scope :api do
    devise_for :users,
              defaults: { format: :json },
              skip: %i[password]
    resources :authentication_checks, only: :index, defaults: { format: :json }
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

    resources :tags, defaults: { format: :json }, except: :show do
      resources :dictionaries, defaults: { format: :json }, module: :tags
    end

    resources :dictionaries, defaults: { format: :json } do
      resources :words, defaults: { format: :json }, module: :dictionaries
    end
  end

  get '*path', to: 'statics#index'
end
