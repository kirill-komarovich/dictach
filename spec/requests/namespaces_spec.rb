# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Namespaces API', type: :request do
  let(:user) { create(:user) }

  before { sign_in(user) }

  describe '/namespaces' do
    let(:namespaces) { create_list(:namespace, 3, user: user) }
    let(:expected_response) do
      namespaces.map do |namespace|
        {
          id: namespace.id,
          title: namespace.title
        }
      end
    end

    context 'without "with_dicitionaries" parameter' do
      it 'returns namespaces owned by current user', :aggregate_failures do
        p namespaces_path
        byebug
        get namespaces_path

        expect(response).to have_http_status 200
        expect(response.body).to eq expected_response.to_json
      end
    end

    context 'with "with_dicitionaries" parameter' do
      it 'returns namespaces owned by current user', :aggregate_failures do
        get namespaces_path, params: { with_dicitionaries: 1 }

        expect(response).to have_http_status 200
      end
    end
  end
end
