# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tags API' do
  let(:user) { create(:user) }

  before do
    api_sign_in(user)
  end

  describe 'GET /tags' do
    let!(:tags) { create_list(:tag, 3, user: user) }

    context 'without dicitionaries' do
      let(:expected_response) do
        tags.map do |tag|
          {
            id: tag.id,
            title: tag.title
          }
        end
      end

      it 'returns tags owned by current user', :aggregate_failures do
        get tags_path

        expect(response).to have_http_status 200
        expect(response.body).to eq expected_response.to_json
      end
    end
  end

  describe 'POST /tags' do
    context 'with valid params' do
      let(:tag_params) { attributes_for(:tag, user: user) }

      it 'returns created tag', :aggregate_failures do
        post tags_path, params: { tag: tag_params }

        body = JSON.parse(response.body)
        tag = Tag.find_by(id: body['id'])
        expect(response).to have_http_status 201
        expect(body['created_at']).to eq I18n.l(tag.created_at)
        expect(body['title']).to eq tag_params[:title]
      end
    end

    context 'with invalid params' do
      let(:tag_params) { attributes_for(:tag, user: user, title: 'a') }

      it 'returns errors', :aggregate_failures do
        post tags_path, params: { tag: tag_params }

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.tag.attributes.title').capitalize,
          message: I18n.t('errors.messages.too_short', count: 3)
        )
      end
    end
  end

  describe 'PUT | PATCH /tags/:id/' do
    let(:tag) { create(:tag, user: user) }

    context 'with valid params' do
      let(:tag_params) { attributes_for(:tag, user: user) }

      it 'updates tag', :aggregate_failures do
        put tag_path(tag.id), params: { tag: tag_params }

        body = JSON.parse(response.body)
        expect(response).to have_http_status 200
        expect(body['id']).to eq tag.id
        expect(body['updated_at']).to eq I18n.l(tag.updated_at)
        expect(body['title']).to eq tag_params[:title]
      end
    end

    context 'with invalid params' do
      let(:tag_params) { attributes_for(:tag, user: user, title: 'a') }

      it 'does not update tag', :aggregate_failures do
        put tag_path(tag.id), params: { tag: tag_params }

        body = JSON.parse(response.body)
        expect(response).to have_http_status 422
        expect(body['errors']).to include I18n.t(
          'errors.format',
          attribute: I18n.t('models.tag.attributes.title').capitalize,
          message: I18n.t('errors.messages.too_short', count: 3)
        )
      end
    end
  end

  describe 'DELETE /tags/:id/' do
    let(:tag) { create(:tag, user: user) }

    it 'deletes tag', :aggregate_failures do
      delete tag_path(tag.id)

      expect(response).to have_http_status 200
      expect(response.body).to eq tag.to_json
      expect(Tag.find_by(id: tag.id)).to be_nil
    end
  end
end
