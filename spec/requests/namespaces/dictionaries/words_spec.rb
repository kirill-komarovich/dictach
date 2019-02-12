# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Words API' do
  let(:user) { create(:user) }
  let(:namespace) { create(:namespace, user: user) }
  let(:dictionary) { create(:dictionary, namespace: namespace) }

  before do
    api_sign_in(user)
  end

  describe 'GET /namespaces/:namespace_id/dictionaries/:dictionary_id/words' do
    let!(:words) { create_list(:word, 3, dictionary: dictionary) }
    let(:expected_response) do
      words.sort_by(&:title).map do |word|
        {
          id: word.id,
          title: word.title,
          dictionary_id: dictionary.id
        }
      end
    end

    it 'returns words in selected dictionary sorted by title', :aggregate_failures do
      get namespace_dictionary_words_path(namespace_id: namespace.id, dictionary_id: dictionary.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq expected_response.to_json
    end

    context 'with letter param' do
      let(:letter) { 'a' }
      let!(:words) do
        3.times.with_object([]) do |index, array|
          array << create(:word, title: "#{letter}_word_#{index}", dictionary: dictionary)
        end
      end
      let(:another_word) { create(:word, title: 'some_word', dictionary: dictionary) }

      it 'returns words that starts with requested letter' do
        get(
          namespace_dictionary_words_path(namespace_id: namespace.id, dictionary_id: dictionary.id),
          params: { letter: letter }
        )

        expect(response).to have_http_status 200
        expect(response.body).to eq expected_response.to_json
      end
    end

    context 'when letter param longer than 1 letter' do
      let(:letter) { 'aa' }
      let(:expected_response) do
        {
          errors: [
            I18n.t('controllers.words.params.letter.error')
          ]
        }
      end

      it 'returns error' do
        get(
          namespace_dictionary_words_path(namespace_id: namespace.id, dictionary_id: dictionary.id),
          params: { letter: letter }
        )

        expect(response).to have_http_status 400
        expect(response.body).to eq expected_response.to_json
      end
    end
  end

  describe 'POST /namespaces/:namespace_id/dictionaries/:dictionary_id/words' do
    context 'with valid params' do
      let(:word_params) { attributes_for(:word, dictionary: dictionary) }

      it 'returns created word', :aggregate_failures do
        post(
          namespace_dictionary_words_path(namespace_id: namespace.id, dictionary_id: dictionary.id),
          params: { word: word_params }
        )

        body = JSON.parse(response.body)
        word = Word.find_by(id: body['id'])
        expect(response).to have_http_status 201
        expect(body['created_at']).to eq I18n.l(word.created_at)
        expect(body['title']).to eq word_params[:title]
        expect(body['dictionary_id']).to eq dictionary.id
      end
    end

    context 'with invalid params' do
      let(:word_params) { attributes_for(:word, dictionary: dictionary, title: 'a') }

      it 'returns errors', :aggregate_failures do
        post(
          namespace_dictionary_words_path(namespace_id: namespace.id, dictionary_id: dictionary.id),
          params: { word: word_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.word.attributes.title').capitalize,
          message: I18n.t('errors.messages.too_short', count: 3)
        )
      end
    end
  end

  describe 'GET /namespaces/:namespace_id/dictionaries/:dictionary_id/words/:id/' do
    let(:word) { create(:word, dictionary: dictionary) }
    let(:expected_response) do
      {
        id: word.id,
        title: word.title,
        dictionary_id: dictionary.id,
        descriptions: word.descriptions
      }
    end
    let(:path_params) do
      {
        namespace_id: namespace.id,
        dictionary_id: dictionary.id,
        id: word.id
      }
    end

    it 'returns word', :aggregate_failures do
      get namespace_dictionary_word_path(path_params)

      expect(response).to have_http_status 200
      expect(response.body).to eq expected_response.to_json
    end
  end

  describe 'PUT | PATCH /namespaces/:namespace_id/dictionaries/:dictionary_id/words/:id/' do
    let(:word) { create(:word, dictionary: dictionary) }
    let(:path_params) do
      {
        namespace_id: namespace.id,
        dictionary_id: dictionary.id,
        id: word.id
      }
    end

    context 'with valid params' do
      let(:word_params) { attributes_for(:word, dictionary: dictionary) }

      it 'updates word', :aggregate_failures do
        put(
          namespace_dictionary_word_path(path_params),
          params: { word: word_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 200
        expect(body['id']).to eq word.id
        expect(body['updated_at']).to eq I18n.l(word.updated_at)
        expect(body['title']).to eq word_params[:title]
        expect(body['dictionary_id']).to eq dictionary.id
      end
    end

    context 'with invalid params' do
      let(:word_params) { attributes_for(:word, dictionary: dictionary, title: 'a') }

      it 'returns errors', :aggregate_failures do
        put(
          namespace_dictionary_word_path(path_params),
          params: { word: word_params }
        )

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.word.attributes.title').capitalize,
          message: I18n.t('errors.messages.too_short', count: 3)
        )
      end
    end
  end

  describe 'DELETE /namespaces/:namespace_id/dictionaries/:dictionary_id/words/:id/' do
    let(:word) { create(:word, dictionary: dictionary) }
    let(:path_params) do
      {
        namespace_id: namespace.id,
        dictionary_id: dictionary.id,
        id: word.id
      }
    end

    it 'deletes word', :aggregate_failures do
      delete namespace_dictionary_word_path(path_params)

      expect(response).to have_http_status 200
      expect(response.body).to eq word.to_json
      expect(Word.find_by(id: word.id)).to be_nil
    end
  end
end
