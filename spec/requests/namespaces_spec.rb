# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Namespaces API' do
  let!(:user) { create(:user) }

  before do
    api_sign_in(user)
  end

  describe 'GET /namespaces' do
    let!(:namespaces) { create_list(:namespace, 3, user: user) }

    context 'without dicitionaries' do
      let(:expected_response) do
        namespaces.map do |namespace|
          {
            id: namespace.id,
            title: namespace.title
          }
        end
      end

      it 'returns namespaces owned by current user', :aggregate_failures do
        get namespaces_path

        expect(response).to have_http_status 200
        expect(response.body).to eq expected_response.to_json
      end
    end

    context 'with dicitionaries parameter' do
      let(:expected_response) do
        namespaces.map do |namespace|
          {
            id: namespace.id,
            title: namespace.title,
            dictionaries: namespace.dicitionaries.map do |dictionary|
              {
                id: dictionary.id,
                title: dictionary.title
              }
            end
          }
        end
      end

      it 'returns namespaces owned by current user', :aggregate_failures do
        get namespaces_path, params: { with_dicitionaries: 1 }

        expect(response).to have_http_status 200
      end
    end
  end

  describe 'POST /namespaces' do

  end

  describe 'GET /namespaces/:id/' do

  end

  describe 'PUT /namespaces/:id/' do

  end

  describe 'DELETE /namespaces/:id/' do

  end
end
