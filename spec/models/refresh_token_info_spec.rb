# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RefreshTokenInfo, type: :model do
  subject { build(:refresh_token_info) }

  it { is_expected.to be_valid }

  it do
    is_expected.to belong_to(:refresh_token)
      .class_name('Doorkeeper::AccessToken')
      .with_foreign_key(:refresh_token_id)
      .dependent(:destroy)
  end

  describe 'public instance methods' do
    describe '#expired?' do
      subject { create(:refresh_token_info) }

      it 'returns whether the token has expired or not' do
        expected = Time.now.utc > subject.created_at + RefreshTokenInfo::EXPIRES_IN
        expect(subject.expired?).to eq expected
      end
    end
  end
end
