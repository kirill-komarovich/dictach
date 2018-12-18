# frozen_string_literal: true

Rails.application.routes.draw do
  use_doorkeeper do
    skip_controllers :authorizations, :applications, :authorized_applications
  end
  devise_for :users,
             defaults: { format: :json },
             controllers: {
               registrations: 'users/registrations'
             },
             skip: %i[sessions password]
  get 'home', to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
