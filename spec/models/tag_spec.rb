# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag, type: :model do
  subject { build(:tag) }

  it { is_expected.to be_valid }

  describe 'associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:tags_dictionaries).dependent(:destroy) }
    it { is_expected.to have_many(:dictionaries).through(:tags_dictionaries) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_least(3).is_at_most(255) }
    it { is_expected.to validate_uniqueness_of(:title).case_insensitive.scoped_to(:user_id) }
  end
end
