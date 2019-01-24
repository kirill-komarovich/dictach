# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Sign up', type: :request do
  context 'with valid credentials' do
    let(:user_attributes) { attributes_for(:user) }

    it 'signs up new user', :aggregate_failures do
      post user_registration_path, params: { user: user_attributes }

      user = User.find_by(email: user_attributes[:email])
      expect(response.body).to eq user.to_json
      expect(response).to have_http_status 201
    end
  end

  context 'with invalid credentials' do
    context 'with invalid password' do
      context 'when password too short' do
        let(:user_attributes) { attributes_for(:user, password: 'p', password_confirmation: 'p') }
        let(:errors) do
          {
            errors: {
              password: [
                I18n.t('errors.messages.too_short', count: 6)
              ]
            }
          }
        end

        it 'does not sign up new user', :aggregate_failures do
          post user_registration_path, params: { user: user_attributes }

          expect(response.body).to eq errors.to_json
          expect(response).to have_http_status 422
        end
      end

      context 'when password too long' do
        let(:user_attributes) do
          attributes_for(:user, password: 'p' * 256, password_confirmation: 'p' * 256)
        end
        let(:errors) do
          {
            errors: {
              password: [
                I18n.t('errors.messages.too_long', count: 128)
              ]
            }
          }
        end

        it 'does not sign up new user', :aggregate_failures do
          post user_registration_path, params: { user: user_attributes }

          expect(response.body).to eq errors.to_json
          expect(response).to have_http_status 422
        end
      end
    end

    context 'with invalid password confirmation' do
      let(:user_attributes) { attributes_for(:user, password_confirmation: 'invalid_confirmation') }
      let(:errors) do
        {
          errors: {
            password_confirmation: [
              I18n.t(
                'errors.messages.confirmation',
                attribute: I18n.t('models.user.attributes.password').capitalize
              )
            ]
          }
        }
      end

      it 'does not sign up new user', :aggregate_failures do
        post user_registration_path, params: { user: user_attributes }

        expect(response.body).to eq errors.to_json
        expect(response).to have_http_status 422
      end
    end

    context 'with invalid email' do
      let(:user_attributes) { attributes_for(:user, email: 'invalid-email') }
      let(:errors) do
        {
          errors: {
            email: [
              I18n.t(
                'errors.messages.invalid',
                attribute: I18n.t('models.user.attributes.email').capitalize
              )
            ]
          }
        }
      end

      it 'does not sign up new user', :aggregate_failures do
        post user_registration_path, params: { user: user_attributes }

        expect(response.body).to eq errors.to_json
        expect(response).to have_http_status 422
      end
    end

    context 'with email that already exists' do
      let(:user) { create(:user) }
      let(:user_attributes) { attributes_for(:user, email: user.email) }
      let(:errors) do
        {
          errors: {
            email: [
              I18n.t('errors.messages.taken')
            ]
          }
        }
      end

      it 'does not sign up new user', :aggregate_failures do
        post user_registration_path, params: { user: user_attributes }

        expect(response.body).to eq errors.to_json
        expect(response).to have_http_status 422
      end
    end
  end
end
