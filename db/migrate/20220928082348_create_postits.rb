class CreatePostits < ActiveRecord::Migration[7.0]
  def change
    create_table :postits do |t|
      t.string :title
      t.string :description
      t.boolean :done

      t.timestamps
    end
  end
end
