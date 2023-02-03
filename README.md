# Table

A basic html-like table component for React Native

The core function that it serves is to shrink-wrap to cells, rather than use a `flex` style, the way that an html table would.

___This is currently pre-alpha. There are known logical errors.___

## Basic usage
```js
<Table>
  <TR>
    <TD>
      // Some components
    </TD>
  </TR>
</Table>
```

## No-wrapping columns
If you want some columns to automatically get as much space as they need, use the `priviledgedColumns` prop of `Table`.
Example where the first and third columns no-wrap:
```js
<Table priviledgedColumns={[0, 2]}>
  ...
</Table>
```

## Style
`Table` accepts all [`ViewStyle` props](https://reactnative.dev/docs/view-style-props). `TR` and `TD` accept no props. But you are free to style the inner components of `TD` however you like.

## Limitations
All tables must contain at least 1 row.
All rows must contain at least 1 column.
All rows must contain the same number of columns.
