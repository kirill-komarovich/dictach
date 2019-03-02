# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Dictionaries::WordsController, type: :controller do
  let(:user) { create(:user) }
  let(:dictionary) { create(:dictionary, user: user) }
  let(:route_params) do
    {
      dictionary_id: dictionary.id
    }
  end

  before { sign_in(user) }

  describe '#index' do
    let!(:words) { create_list(:word, 3, dictionary: dictionary).sort_by(&:title) }

    it 'renders index template', :aggregate_failures do
      get :index, params: route_params, format: :json

      expect(response).to have_http_status 200
      expect(response).to render_template :index
      expect(assigns(:words)).to eq words
    end
  end

  describe '#create' do
    let(:params) do
      {
        word: word_params
      }.merge(route_params)
    end

    context 'with valid params' do
      let(:word_params) { attributes_for(:word, dictionary: dictionary) }

      it 'creates new word', :aggregate_failures do
        post :create, format: :json, params: params

        new_word = Word.last
        expect(response).to have_http_status 201
        expect(response).to render_template :create
        expect(new_word.title).to eq word_params[:title]
        expect(new_word.dictionary_id).to eq dictionary.id
      end
    end

    context 'with invalid params' do
      let(:word_params) { attributes_for(:word, dictionary: dictionary, title: 'a') }

      it 'does not create new dictionary', :aggregate_failures do
        expect do
          post :create, format: :json, params: params
        end.to change { Word.count }.by(0)

        expect(response).to have_http_status 422
        expect(response).to render_template 'shared/errors'
      end
    end
  end

  describe '#show' do
    let(:word) { create(:word, dictionary: dictionary) }

    it 'renders show template', :aggregate_failures do
      get :show, params: route_params.merge(id: word.id), format: :json

      expect(response).to have_http_status 200
      expect(response).to render_template :show
      expect(assigns(:word)).to eq word
    end
  end

  describe '#update' do
    let!(:word) { create(:word, dictionary: dictionary) }
    let(:params) do
      {
        id: word.id,
        word: word_params
      }.merge(route_params)
    end

    context 'with valid params' do
      let(:word_params) { attributes_for(:word, dictionary: dictionary) }

      it 'updates dictionary', :aggregate_failures do
        put :update, params: params, format: :json

        expect(response).to have_http_status 200
        expect(response).to render_template :update
        expect(word.reload.title).to eq word_params[:title]
      end
    end

    context 'with invalid params' do
      let(:word_params) { attributes_for(:word, dictionary: dictionary, title: 'a') }

      it 'does not update dictionary', :aggregate_failures do
        put :update, params: params, format: :json

        expect(response).to have_http_status 422
        expect(response).to render_template 'shared/errors'
        expect(word.reload.title).not_to eq word_params[:title]
      end
    end
  end

  describe '#destroy' do
    let!(:word) { create(:word, dictionary: dictionary) }

    it 'deletes dictionary', :aggregate_failures do
      delete :destroy, params: { id: word.id }.merge(route_params), format: :json

      expect(Word.find_by(id: dictionary.id)).to be_nil
      expect(response).to have_http_status 200
    end
  end
end
