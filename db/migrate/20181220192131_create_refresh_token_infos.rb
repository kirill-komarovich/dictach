class CreateRefreshTokenInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :refresh_token_infos do |t|
      t.references :refresh_token, null: false, index: true

      t.timestamps
    end
  end
end
