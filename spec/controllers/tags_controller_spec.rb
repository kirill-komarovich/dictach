# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TagsController, type: :controller do
  let(:user) { create(:user) }

  before { sign_in(user) }

  describe '#index' do
    let!(:tags) { create_list(:tag, 3, user: user) }

    it 'renders index template', :aggregate_failures do
      get :index, format: :json

      expect(response).to have_http_status 200
      expect(response).to render_template :index
      expect(assigns(:tags)).to eq tags
    end
  end

  describe '#create' do
    context 'with valid params' do
      let(:tag_params) { attributes_for(:tag, user: user) }

      it 'creates new tag', :aggregate_failures do
        post :create, format: :json, params: { tag: tag_params }

        new_tag = Tag.last
        expect(response).to have_http_status 201
        expect(response).to render_template :create
        expect(new_tag.title).to eq tag_params[:title]
        expect(new_tag.user_id).to eq user.id
      end
    end

    context 'with invalid params' do
      let(:tag_params) { attributes_for(:tag, user: user, title: 'a') }

      it 'does not create new tag', :aggregate_failures do
        expect do
          post :create, format: :json, params: { tag: tag_params }
        end.to change { Tag.count }.by(0)

        expect(response).to have_http_status 422
        expect(response).to render_template 'shared/errors'
      end
    end
  end

  describe '#update' do
    let!(:tag) { create(:tag, user: user) }

    context 'with valid params' do
      let(:tag_params) { attributes_for(:tag, user: user) }

      it 'updates tag', :aggregate_failures do
        put :update, params: { id: tag.id, tag: tag_params }, format: :json

        expect(response).to have_http_status 200
        expect(response).to render_template :update
        expect(tag.reload.title).to eq tag_params[:title]
      end
    end

    context 'with invalid params' do
      let(:tag_params) { attributes_for(:tag, user: user, title: 'a') }

      it 'does not update tag', :aggregate_failures do
        put :update, params: { id: tag.id, tag: tag_params }, format: :json

        expect(response).to have_http_status 422
        expect(response).to render_template 'shared/errors'
        expect(tag.reload.title).not_to eq tag_params[:title]
      end
    end
  end

  describe '#destroy' do
    let!(:tag) { create(:tag, user: user) }

    it 'deletes tag', :aggregate_failures do
      delete :destroy, params: { id: tag.id }, format: :json

      expect(Tag.find_by(id: tag.id)).to be_nil
      expect(response).to have_http_status 200
    end
  end
end
