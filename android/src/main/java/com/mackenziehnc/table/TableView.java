package com.mackenziehnc.table;

import android.content.Context;
import android.view.View;
import android.widget.GridLayout;

public class TableView extends GridLayout {

  public TableView(Context context) {
    super(context);
    this.setColumnCount(2);
  }

  @Override
  public void addView(View child, int index) {
    GridLayout.LayoutParams params = new GridLayout.LayoutParams();
    params.rowSpec = GridLayout.spec(index / getColumnCount());
    params.columnSpec = GridLayout.spec(index % getColumnCount());
    child.setLayoutParams(params);
    super.addView(child, index);
  }
}
