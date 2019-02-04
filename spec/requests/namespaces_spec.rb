# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Namespaces API' do
  let(:user) { create(:user) }

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
      before do
        namespaces.each do |namespace|
          create_list(:dictionary, 3, namespace: namespace)
        end
      end

      let(:expected_response) do
        namespaces.map do |namespace|
          {
            id: namespace.id,
            title: namespace.title,
            dictionaries: namespace.dictionaries.map do |dictionary|
              {
                id: dictionary.id,
                title: dictionary.title
              }
            end
          }
        end
      end

      it 'returns namespaces owned by current user', :aggregate_failures do
        get namespaces_path, params: { with_dictionaries: '1' }

        expect(response).to have_http_status 200
        expect(response.body).to eq expected_response.to_json
      end
    end
  end

  describe 'POST /namespaces' do
    context 'with valid params' do
      let(:namespace_params) { attributes_for(:namespace, user: user) }

      it 'returns created namespace', :aggregate_failures do
        post namespaces_path, params: { namespace: namespace_params }

        body = JSON.parse(response.body)
        namespace = Namespace.find_by(id: body['id'])
        expect(response).to have_http_status 201
        expect(body['created_at']).to eq I18n.l(namespace.created_at)
        expect(body['title']).to eq namespace_params[:title]
      end
    end

    context 'with invalid params' do
      let(:namespace_params) { attributes_for(:namespace, user: user, title: 'a') }

      it 'returns errors', :aggregate_failures do
        post namespaces_path, params: { namespace: namespace_params }

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.namespace.attributes.title').capitalize,
          message: I18n.t('errors.messages.too_short', count: 3)
        )
      end
    end
  end

  describe 'GET /namespaces/:id/' do
    let!(:namespace) { create(:namespace, user: user) }
    let(:expected_response) do
      {
        id: namespace.id,
        title: namespace.title,
        dictionaries: namespace.dictionaries.map do |dictionary|
          {
            id: dictionary.id,
            title: dictionary.title
          }
        end
      }
    end

    before do
      create_list(:dictionary, 3, namespace: namespace)
    end

    it 'returns namespace with dictionaries', :aggregate_failures do
      get namespace_path(namespace.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq expected_response.to_json
    end
  end

  describe 'PUT | PATCH /namespaces/:id/' do
    let(:namespace) { create(:namespace, user: user) }

    context 'with valid params' do
      let(:namespace_params) { attributes_for(:namespace, user: user) }

      it 'updates namespace', :aggregate_failures do
        put namespace_path(namespace.id), params: { namespace: namespace_params }

        body = JSON.parse(response.body)
        expect(response).to have_http_status 200
        expect(body['id']).to eq namespace.id
        expect(body['updated_at']).to eq I18n.l(namespace.updated_at)
        expect(body['title']).to eq namespace_params[:title]
      end
    end

    context 'with invalid params' do
      let(:namespace_params) { attributes_for(:namespace, user: user, title: 'a') }

      it 'does not update namespace', :aggregate_failures do
        put namespace_path(namespace.id), params: { namespace: namespace_params }

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.namespace.attributes.title').capitalize,
          message: I18n.t('errors.messages.too_short', count: 3)
        )
      end
    end
  end

  describe 'DELETE /namespaces/:id/' do
    let(:namespace) { create(:namespace, user: user) }

    it 'deletes namespace', :aggregate_failures do
      delete namespace_path(namespace.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq namespace.to_json
      expect(Namespace.find_by(id: namespace.id)).to be_nil
    end
  end
end
