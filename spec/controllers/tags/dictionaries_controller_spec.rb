# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tags::DictionariesController, type: :controller do
  let(:user) { create(:user) }
  let!(:tag) { create(:tag, user: user) }

  before { sign_in(user) }

  describe '#index' do
    let!(:dictionaries) { create_list(:dictionary, 3, user: user) }

    before { tag.dictionaries << dictionaries }

    it 'renders index template', :aggregate_failures do
      get :index, params: { tag_id: tag.id }, format: :json

      expect(response).to have_http_status 200
      expect(response).to render_template :index
      expect(assigns(:dictionaries)).to eq dictionaries
    end
  end

  describe '#create' do
    let(:params) do
      {
        dictionary: dictionary_params,
        tag_id: tag.id
      }
    end

    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user) }

      it 'creates new dictionary', :aggregate_failures do
        post :create, format: :json, params: params

        new_dictionary = Dictionary.last
        expect(response).to have_http_status 201
        expect(response).to render_template :create
        expect(new_dictionary.title).to eq dictionary_params[:title]
        expect(new_dictionary.language).to eq dictionary_params[:language]
        expect(new_dictionary.user_id).to eq user.id
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user, title: '') }

      it 'does not create new dictionary', :aggregate_failures do
        expect do
          post :create, format: :json, params: params
        end.to change { Dictionary.count }.by(0)

        expect(response).to have_http_status 422
        expect(response).to render_template 'shared/errors'
      end
    end
  end

  describe '#show' do
    let!(:dictionary) { create(:dictionary, user: user) }
    before { tag.dictionaries << dictionary }

    it 'renders show template', :aggregate_failures do
      get :show, params: { tag_id: tag.id, id: dictionary.id, user_id: user.id }, format: :json

      expect(response).to have_http_status 200
      expect(response).to render_template :show
      expect(assigns(:dictionary)).to eq dictionary
    end
  end

  describe '#update' do
    let!(:dictionary) { create(:dictionary, user: user) }
    let(:params) do
      {
        id: dictionary.id,
        dictionary: dictionary_params,
        tag_id: tag.id
      }
    end
    before { tag.dictionaries << dictionary }

    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user) }

      it 'updates dictionary', :aggregate_failures do
        put :update, params: params, format: :json

        expect(response).to have_http_status 200
        expect(response).to render_template :update
        expect(dictionary.reload.title).to eq dictionary_params[:title]
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, user: user, title: '') }

      it 'does not update dictionary', :aggregate_failures do
        put :update, params: params, format: :json

        expect(response).to have_http_status 422
        expect(response).to render_template 'shared/errors'
        expect(dictionary.reload.title).not_to eq dictionary_params[:title]
      end
    end
  end

  describe '#destroy' do
    let!(:dictionary) { create(:dictionary, user: user) }
    before { tag.dictionaries << dictionary }

    it 'deletes dictionary', :aggregate_failures do
      delete :destroy, params: { tag_id: tag.id, id: dictionary.id }, format: :json

      expect(Dictionary.find_by(id: dictionary.id)).to be_nil
      expect(response).to have_http_status 200
    end
  end
end
