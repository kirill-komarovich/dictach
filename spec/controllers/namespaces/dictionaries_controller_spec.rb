# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Namespaces::DictionariesController, type: :controller do
  let(:user) { create(:user) }
  let(:namespace) { create(:namespace, user: user) }

  before { sign_in(user) }

  describe '#index' do
    let!(:dictionaries) { create_list(:dictionary, 3, namespace: namespace) }

    it 'renders index template', :aggregate_failures do
      get :index, params: { namespace_id: namespace.id }, format: :json

      expect(response).to have_http_status 200
      expect(response).to render_template :index
      expect(assigns(:dictionaries)).to eq dictionaries
    end
  end

  describe '#create' do
    let(:params) do
      {
        dictionary: dictionary_params,
        namespace_id: namespace.id
      }
    end

    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, namespace: namespace) }

      it 'creates new dictionary', :aggregate_failures do
        post :create, format: :json, params: params

        new_dictionary = Dictionary.last
        expect(response).to have_http_status 201
        expect(response).to render_template :create
        expect(new_dictionary.title).to eq dictionary_params[:title]
        expect(new_dictionary.language).to eq dictionary_params[:language]
        expect(new_dictionary.namespace_id).to eq namespace.id
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, namespace: namespace, title: 'a') }

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
    let!(:dictionary) { create(:dictionary, namespace: namespace) }

    it 'renders show template', :aggregate_failures do
      get :show, params: { id: dictionary.id, namespace_id: namespace.id }, format: :json

      expect(response).to have_http_status 200
      expect(response).to render_template :show
      expect(assigns(:dictionary)).to eq dictionary
    end
  end

  describe '#update' do
    let!(:dictionary) { create(:dictionary, namespace: namespace) }
    let(:params) do
      {
        id: dictionary.id,
        dictionary: dictionary_params,
        namespace_id: namespace.id
      }
    end

    context 'with valid params' do
      let(:dictionary_params) { attributes_for(:dictionary, namespace: namespace) }

      it 'updates dictionary', :aggregate_failures do
        put :update, params: params, format: :json

        expect(response).to have_http_status 200
        expect(response).to render_template :update
        expect(dictionary.reload.title).to eq dictionary_params[:title]
      end
    end

    context 'with invalid params' do
      let(:dictionary_params) { attributes_for(:dictionary, namespace: namespace, title: 'a') }

      it 'does not update dictionary', :aggregate_failures do
        put :update, params: params, format: :json

        expect(response).to have_http_status 422
        expect(response).to render_template 'shared/errors'
        expect(namespace.reload.title).not_to eq dictionary_params[:title]
      end
    end
  end

  describe '#destroy' do
    let!(:dictionary) { create(:dictionary, namespace: namespace) }

    it 'deletes dictionary', :aggregate_failures do
      delete :destroy, params: { id: dictionary.id, namespace_id: namespace.id }, format: :json

      expect(Dictionary.find_by(id: dictionary.id)).to be_nil
      expect(response).to have_http_status 200
    end
  end
end
