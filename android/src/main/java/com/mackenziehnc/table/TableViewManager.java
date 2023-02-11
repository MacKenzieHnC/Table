package com.mackenziehnc.table;

import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.GridLayout;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class TableViewManager extends ViewGroupManager<GridLayout> {

  public static final String REACT_CLASS = "TableViewManager";

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  public GridLayout createViewInstance(@NonNull ThemedReactContext reactContext) {
    GridLayout gridLayout = new GridLayout(reactContext);
    GridLayout.LayoutParams params = new GridLayout.LayoutParams();
    params.setGravity(Gravity.FILL_HORIZONTAL);
    gridLayout.setLayoutParams(params);
    gridLayout.setAlignmentMode(GridLayout.ALIGN_BOUNDS);
    Log.d("Debug", "Layout column count: " + gridLayout.getColumnCount());
    return gridLayout;
  }


  @ReactProp(name = "columnCount")
  public void setPosition(GridLayout view, int columnCount) {
    view.setColumnCount(columnCount);
  }

}
