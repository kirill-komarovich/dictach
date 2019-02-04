# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Dictionary API' do
  let(:user) { create(:user) }
  let(:namespace) { create(:namespace, user: user) }

  before do
    api_sign_in(user)
  end

  describe 'GET /namespaces/:namespace_id/dictionaries' do
    let!(:dictionaries) { create_list(:dictionary, 3, namespace: namespace) }
    let(:expected_response) do
      dictionaries.map do |dictionary|
        {
          id: dictionary.id,
          title: dictionary.title,
          language: dictionary.language,
          namespace_id: namespace.id
        }
      end
    end

    it 'returns dictionaries owned by current user', :aggregate_failures do
      get namespace_dictionaries_path(namespace_id: namespace.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq expected_response.to_json
    end
  end

  describe 'POST /namespaces/:namespace_id/dictionaries' do
    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, namespace: namespace) }

      it 'returns created dictionary', :aggregate_failures do
        post(
          namespace_dictionaries_path(namespace_id: namespace.id),
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        dictionary = Dictionary.find_by(id: body['id'])
        expect(response).to have_http_status 201
        expect(body['created_at']).to eq I18n.l(dictionary.created_at)
        expect(body['title']).to eq dictionary_params[:title]
        expect(body['language']).to eq dictionary_params[:language]
        expect(body['namespace_id']).to eq namespace.id
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, namespace: namespace, title: 'a') }

      it 'returns errors', :aggregate_failures do
        post(
          namespace_dictionaries_path(namespace_id: namespace.id),
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.dictionary.attributes.title').capitalize,
          message: I18n.t('errors.messages.too_short', count: 3)
        )
      end
    end
  end

  describe 'GET /namespaces/:namespace_id/dictionaries/:id/' do
    let(:dictionary) { create(:dictionary, namespace: namespace) }
    let(:expected_response) do
      {
        id: dictionary.id,
        title: dictionary.title,
        language: dictionary.language,
        namespace_id: namespace.id,
        alphabeth: dictionary.alphabeth
      }
    end

    it 'returns dictionary', :aggregate_failures do
      get namespace_dictionary_path(namespace_id: namespace.id, id: dictionary.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq expected_response.to_json
    end
  end

  describe 'PUT | PATCH /namespaces/:namespace_id/dictionaries/:id/' do
    let(:dictionary) { create(:dictionary, namespace: namespace) }

    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, namespace: namespace) }

      it 'updates dictionary', :aggregate_failures do
        put(
          namespace_dictionary_path(namespace_id: namespace.id, id: dictionary.id),
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 200
        expect(body['id']).to eq dictionary.id
        expect(body['updated_at']).to eq I18n.l(dictionary.updated_at)
        expect(body['title']).to eq dictionary_params[:title]
        expect(body['language']).to eq dictionary_params[:language]
        expect(body['namespace_id']).to eq namespace.id
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, namespace: namespace, title: 'a') }

      it 'does not update dictionary', :aggregate_failures do
        put(
          namespace_dictionary_path(namespace_id: namespace.id, id: dictionary.id),
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.namespace.attributes.title').capitalize,
          message: I18n.t('errors.messages.too_short', count: 3)
        )
      end
    end
  end

  describe 'DELETE /namespaces/:namespace_id/dictionaries/:id/' do
    let(:dictionary) { create(:dictionary, namespace: namespace) }

    it 'deletes dictionary', :aggregate_failures do
      delete namespace_dictionary_path(namespace_id: namespace.id, id: dictionary.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq dictionary.to_json
      expect(Dictionary.find_by(id: dictionary.id)).to be_nil
    end
  end
end
