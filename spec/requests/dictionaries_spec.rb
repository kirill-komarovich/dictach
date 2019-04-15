# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Dictionary API' do
  let(:user) { create(:user) }

  before do
    api_sign_in(user)
  end

  describe 'GET /dictionaries' do
    let!(:dictionaries) { create_list(:dictionary, 3, user: user) }
    let(:dictionaries_array) do
      dictionaries.map do |dictionary|
        {
          id: dictionary.id,
          title: dictionary.title,
          language: dictionary.language,
          tags: dictionary.tags.pluck(:title)
        }
      end
    end
    let(:expected_response) do
      {
        dictionaries: dictionaries_array,
        meta: {
          pages: 1,
          records: dictionaries.length
        }
      }
    end

    it 'returns dictionaries owned by user', :aggregate_failures do
      get dictionaries_path

      expect(response).to have_http_status 200
      expect(response.body).to eq expected_response.to_json
    end
  end

  describe 'POST /dictionaries' do
    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user) }

      it 'returns created dictionary', :aggregate_failures do
        post(
          dictionaries_path,
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        dictionary = Dictionary.find_by(id: body['id'])
        expect(response).to have_http_status 201
        expect(body['created_at']).to eq dictionary.created_at.to_i
        expect(body['title']).to eq dictionary_params[:title]
        expect(body['language']).to eq dictionary_params[:language]
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user, title: '') }

      it 'returns errors', :aggregate_failures do
        post(
          dictionaries_path,
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.dictionary.attributes.title').capitalize,
          message: I18n.t('errors.messages.blank')
        )
      end
    end
  end

  describe 'GET /dictionaries/:id/' do
    let(:dictionary) { create(:dictionary, user: user) }
    let(:expected_response) do
      {
        id: dictionary.id,
        title: dictionary.title,
        language: dictionary.language,
        tags: dictionary.tags.pluck(:title),
        alphabeth: dictionary.alphabeth
      }
    end

    it 'returns dictionary', :aggregate_failures do
      get dictionary_path(id: dictionary.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq expected_response.to_json
    end
  end

  describe 'PUT | PATCH /dictionaries/:id/' do
    let(:dictionary) { create(:dictionary, user: user) }

    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user) }

      it 'updates dictionary', :aggregate_failures do
        put(
          dictionary_path(id: dictionary.id),
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 200
        expect(body['id']).to eq dictionary.id
        expect(body['updated_at']).to eq dictionary.updated_at.to_i
        expect(body['title']).to eq dictionary_params[:title]
        expect(body['language']).to eq dictionary_params[:language]
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user, title: '') }

      it 'does not update dictionary', :aggregate_failures do
        put(
          dictionary_path(id: dictionary.id),
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.dictionary.attributes.title').capitalize,
          message: I18n.t('errors.messages.blank')
        )
      end
    end
  end

  describe 'DELETE /dictionaries/:id/' do
    let(:dictionary) { create(:dictionary, user: user) }

    it 'deletes dictionary', :aggregate_failures do
      delete dictionary_path(id: dictionary.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq dictionary.to_json
      expect(Dictionary.find_by(id: dictionary.id)).to be_nil
    end
  end
end
