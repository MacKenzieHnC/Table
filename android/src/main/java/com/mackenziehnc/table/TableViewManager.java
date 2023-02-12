package com.mackenziehnc.table;

import android.widget.GridLayout;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class TableViewManager extends ViewGroupManager<TableView> {

  public static final String REACT_CLASS = "TableViewManager";

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  public TableView createViewInstance(@NonNull ThemedReactContext reactContext) {
    return new TableView(reactContext);
  }


  @ReactProp(name = "columnCount")
  public void setPosition(GridLayout view, int columnCount) {
    view.setColumnCount(columnCount);
  }

}
