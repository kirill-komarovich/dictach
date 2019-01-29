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
end
