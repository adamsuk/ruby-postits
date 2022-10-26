class CreatePostitMappings < ActiveRecord::Migration[7.0]
  def change
    create_table :postit_mappings do |t|
      t.references :postit, null: false, foreign_key: true
      t.references :workspace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
