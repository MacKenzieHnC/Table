package com.mackenziehnc.table;
import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.GridLayout;

public class TableView extends GridLayout {

  public TableView(Context context) {
    super(context);
  }

  private void refreshViewChildrenLayout(){
    measure(
      View.MeasureSpec.makeMeasureSpec(getMeasuredWidth(), View.MeasureSpec.EXACTLY),
      View.MeasureSpec.makeMeasureSpec(getMeasuredHeight(), View.MeasureSpec.EXACTLY));
    layout(getLeft(), getTop(), getRight(), getBottom());
  }

  @Override
  public void addView(View child, int index) {
    int row = index / getColumnCount();
    int col = index % getColumnCount();

    GridLayout.LayoutParams params = new GridLayout.LayoutParams(
      GridLayout.spec(row),
      GridLayout.spec(col)
    );
    super.addView(child, index, params);
    refreshViewChildrenLayout();
    Log.d("Debug", index + ": [" + row + ", " + col + "]");

  }
}
