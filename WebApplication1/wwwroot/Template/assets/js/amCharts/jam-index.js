/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);



// Create wrapper container
var container = root.container.children.push(am5.Container.new(root, {
  width: am5.percent(100),
  height: am5.percent(100),
  layout: root.verticalLayout
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = container.children.push(am5hierarchy.ForceDirected.new(root, {
  singleBranchOnly: false,
  downDepth: 4,
  topDepth: 1,
  initialDepth: 0,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  idField: "name",
  linkWithField: "linkWith",
  manyBodyStrength: -10,
  centerStrength: 0.8,
  minRadius: 8,
  maxRadius: am5.percent(10),
  nodePadding: 15,
}));

series.get("colors").setAll({
  step: 2
});

series.labels.template.setAll({
  fontSize: 18,
  fontFamily: "Iransans",
});

series.nodes.template.events.on("click", function(ev) {
  switch(ev.target.dataItem.dataContext.name){
    case "ایده":
          window.location.href = "/Search/Index?Entity=Idea";
    break;
    case "نیاز":
          window.location.href = "/Search/Index?Entity=Need";
    break;
    
    case "محصول":
    case "عرضه":
    case "تقاضا": 
    
       break;
    
    case "اشتغال دانش بنیان":
    case "متقاضی":
    case "مورد نیاز": 
    
       break;
  }
 }, this);

series.links.template.set("strength", 0.5);
series.nodes.template.setAll({
    tooltipText: "{name} : {title}"
});
series.data.setAll([data]);

series.set("selectedDataItem", series.dataItems[0]);
//////////////series.nodes.template.set("tooltipText", null);


// Make stuff animate on load
series.appear(1000, 100);
