# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :controller do
  before do
    request.env['devise.mapping'] = Devise.mappings[:user]
  end

  describe '#create' do
    context 'with valid attributes' do
      let(:user_params) { attributes_for(:user) }

      it 'signs up new user' do
        post :create, params: { user: user_params }, format: :json

        body = JSON.parse(response.body, symbolize_names: true)
        expect(body).to include :id, email: user_params[:email]
        expect(response).to have_http_status 200
      end
    end

    context 'with invalid attributes' do
      context 'with invalid email' do
        let(:user_params) { attributes_for(:user, email: 'email') }

        it 'does not sign up new user', :aggregate_failures do
          post :create, params: { user: user_params }, format: :json

          body = JSON.parse(response.body, symbolize_names: true)
          errors = { errors: { email: [I18n.t('errors.messages.invalid')] } }
          expect(body).to eq errors
          expect(response).to have_http_status 422
        end

        context 'when user already exists' do
          let(:existing_user) { create(:user) }
          let(:user_params) { attributes_for(:user, email: existing_user.email) }

          it 'does not sign up new user', :aggregate_failures do
            post :create, params: { user: user_params }, format: :json

            body = JSON.parse(response.body, symbolize_names: true)
            errors = { errors: { email: [I18n.t('errors.messages.taken')] } }
            expect(body).to eq errors
            expect(response).to have_http_status 422
          end
        end
      end

      context 'with invalid password' do
        context 'when it too short' do
          let(:user_params) do
            attributes_for(:user, password: 'p', password_confirmation: 'p')
          end

          it 'does not sign up new user', :aggregate_failures do
            post :create, params: { user: user_params }, format: :json

            body = JSON.parse(response.body, symbolize_names: true)
            errors = {
              errors: {
                password: [I18n.t('errors.messages.too_short.other', count: 6)]
              }
            }
            expect(body).to eq errors
            expect(response).to have_http_status 422
          end
        end

        context 'when it too long' do
          let(:user_params) do
            attributes_for(
              :user,
              password: 'p' * 129,
              password_confirmation: 'p' * 129
            )
          end

          it 'does not sign up new user', :aggregate_failures do
            post :create, params: { user: user_params }, format: :json

            body = JSON.parse(response.body, symbolize_names: true)
            errors = {
              errors: {
                password: [I18n.t('errors.messages.too_long.other', count: 128)]
              }
            }
            expect(body).to eq errors
            expect(response).to have_http_status 422
          end
        end
      end

      context 'with invalid password confirmation' do
        let(:user_params) do
          attributes_for(
            :user,
            password_confirmation: 'invalid confirmation'
          )
        end

        it 'does not sign up new user', :aggregate_failures do
          post :create, params: { user: user_params }, format: :json

          body = JSON.parse(response.body, symbolize_names: true)
          errors = {
            errors: {
              password_confirmation: [
                I18n.t('errors.messages.confirmation', attribute: 'Password')
              ]
            }
          }
          expect(body).to eq errors
          expect(response).to have_http_status 422
        end
      end
    end
  end
end
