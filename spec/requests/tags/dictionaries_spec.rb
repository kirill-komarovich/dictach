# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Dictionary API' do
  let(:user) { create(:user) }
  let(:tag) { create(:tag, user: user) }

  before do
    api_sign_in(user)
  end

  describe 'GET /tags/:tag_id/dictionaries' do
    let!(:dictionaries) { create_list(:dictionary, 3, user: user) }
    let(:expected_response) do
      dictionaries.map do |dictionary|
        {
          id: dictionary.id,
          title: dictionary.title,
          language: dictionary.language
        }
      end
    end
    before { tag.dictionaries << dictionaries }

    it 'returns dictionaries in selected tag', :aggregate_failures do
      get tag_dictionaries_path(tag_id: tag.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq expected_response.to_json
    end
  end

  describe 'POST /tags/:tag_id/dictionaries' do
    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user) }

      it 'returns created dictionary', :aggregate_failures do
        post(
          tag_dictionaries_path(tag_id: tag.id),
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        dictionary = Dictionary.find_by(id: body['id'])
        expect(response).to have_http_status 201
        expect(body['created_at']).to eq I18n.l(dictionary.created_at)
        expect(body['title']).to eq dictionary_params[:title]
        expect(body['language']).to eq dictionary_params[:language]
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user, title: '') }

      it 'returns errors', :aggregate_failures do
        post(
          tag_dictionaries_path(tag_id: tag.id),
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

  describe 'GET /tags/:tag_id/dictionaries/:id/' do
    let(:dictionary) { create(:dictionary, user: user) }
    let(:expected_response) do
      {
        id: dictionary.id,
        title: dictionary.title,
        language: dictionary.language,
        alphabeth: dictionary.alphabeth
      }
    end
    before { tag.dictionaries << dictionary }

    it 'returns dictionary', :aggregate_failures do
      get tag_dictionary_path(tag_id: tag.id, id: dictionary.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq expected_response.to_json
    end
  end

  describe 'PUT | PATCH /tags/:tag_id/dictionaries/:id/' do
    let(:dictionary) { create(:dictionary, user: user) }
    before { tag.dictionaries << dictionary }

    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user) }

      it 'updates dictionary', :aggregate_failures do
        put(
          tag_dictionary_path(tag_id: tag.id, id: dictionary.id),
          params: { dictionary: dictionary_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 200
        expect(body['id']).to eq dictionary.id
        expect(body['updated_at']).to eq I18n.l(dictionary.updated_at)
        expect(body['title']).to eq dictionary_params[:title]
        expect(body['language']).to eq dictionary_params[:language]
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user, title: '') }

      it 'does not update dictionary', :aggregate_failures do
        put(
          tag_dictionary_path(tag_id: tag.id, id: dictionary.id),
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

  describe 'DELETE /tags/:tag_id/dictionaries/:id/' do
    let(:dictionary) { create(:dictionary, user: user) }
    before { tag.dictionaries << dictionary }

    it 'deletes dictionary', :aggregate_failures do
      delete tag_dictionary_path(tag_id: tag.id, id: dictionary.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq dictionary.to_json
      expect(Dictionary.find_by(id: dictionary.id)).to be_nil
    end
  end
end
