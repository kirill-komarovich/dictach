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

      it 'creates new namespace' do

      end
    end

    context 'with invalid params' do
      let(:namespace_params) { attributes_for(:namespace, user: user) }

      it 'does not create new namespace' do

      end
    end
  end

  describe '#show' do
    let!(:namespace) { create(:namespace, user: user) }

    it 'renders show template', :aggregate_failures do
      get :show, params: { id: namespace.id }

      expect(response).to have_http_status 200
      expect(response).to render_template :show
      expect(assigns(:namespace)).to eq namespace
    end
  end

  describe '#update' do
    context 'with valid params' do
      let!(:namespace) { create(:namespace, user: user) }

      it 'updates namespace' do

      end
    end

    context 'with invalid params' do
      let!(:namespace) { create(:namespace, user: user) }

      it 'does not update namespace' do

      end
    end
  end

  describe '#destroy' do
    let!(:namespace) { create(:namespace, user: user) }

    it 'deletes namespace' do
      delete :destroy, params: { id: namespace.id }
      
    end
  end
end
