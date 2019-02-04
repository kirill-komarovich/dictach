# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NamespacesController, type: :controller do
  let(:user) { create(:user) }

  before { sign_in(user) }

  describe '#index' do
    let!(:namespaces) { create_list(:namespace, 3, user: user) }

    it 'renders index template', :aggregate_failures do
      get :index, format: :json

      expect(response).to have_http_status 200
      expect(response).to render_template :index
      expect(assigns(:namespaces)).to eq namespaces
    end
  end

  describe '#create' do
    context 'with valid params' do
      let(:namespace_params) { attributes_for(:namespace, user: user) }

      it 'creates new namespace', :aggregate_failures do
        post :create, format: :json, params: { namespace: namespace_params }

        new_namespace = Namespace.last
        expect(response).to have_http_status 201
        expect(response).to render_template :create
        expect(new_namespace.title).to eq namespace_params[:title]
        expect(new_namespace.user_id).to eq user.id
      end
    end

    context 'with invalid params' do
      let(:namespace_params) { attributes_for(:namespace, user: user, title: 'a') }

      it 'does not create new namespace', :aggregate_failures do
        expect do
          post :create, format: :json, params: { namespace: namespace_params }
        end.to change { Namespace.count }.by(0)

        expect(response).to have_http_status 422
        expect(response).to render_template 'shared/errors'
      end
    end
  end

  describe '#show' do
    let!(:namespace) { create(:namespace, user: user) }

    it 'renders show template', :aggregate_failures do
      get :show, params: { id: namespace.id }, format: :json

      expect(response).to have_http_status 200
      expect(response).to render_template :show
      expect(assigns(:namespace)).to eq namespace
    end
  end

  describe '#update' do
    let!(:namespace) { create(:namespace, user: user) }

    context 'with valid params' do
      let(:namespace_params) { attributes_for(:namespace, user: user) }

      it 'updates namespace', :aggregate_failures do
        put :update, params: { id: namespace.id, namespace: namespace_params }, format: :json

        expect(response).to have_http_status 200
        expect(response).to render_template :update
        expect(namespace.reload.title).to eq namespace_params[:title]
      end
    end

    context 'with invalid params' do
      let(:namespace_params) { attributes_for(:namespace, user: user, title: 'a') }

      it 'does not update namespace', :aggregate_failures do
        put :update, params: { id: namespace.id, namespace: namespace_params }, format: :json

        expect(response).to have_http_status 422
        expect(response).to render_template 'shared/errors'
        expect(namespace.reload.title).not_to eq namespace_params[:title]
      end
    end
  end

  describe '#destroy' do
    let!(:namespace) { create(:namespace, user: user) }

    it 'deletes namespace', :aggregate_failures do
      delete :destroy, params: { id: namespace.id }, format: :json

      expect(Namespace.find_by(id: namespace.id)).to be_nil
      expect(response).to have_http_status 200
    end
  end
end
