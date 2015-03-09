// var Contact = Backbone.Model.extend({

//   url: "js/contacts.json"

// });

// var ContactView = (function(){

//   var template = JST["contact"]

// function ContactView(model) {
//   _.extend(this, Backbone.Events);
//   this.model = model;
//   this.$el = $("<tr />");
//   // this.listenTo(this.model, "change", function(){
//   //   this.render();
// };
// }

// ContactView.prototype = {
//   render: function() {
//     var markup = template(this.model.toJSON())
//     return this.$el.html ( markup );
//   }

// }
// return ContactView;

// })();

// $(function() {

//   $.ajax("js/contacts.json").done(function(data){

//     _.each(data, function(datum){

//       var contactModel = new Contact(datum);

//       var contactView = new ContactView(contactModel);

//       $("tr").append(contactView.render());
//     });
//   });  
// });

var Employee = Backbone.Model.extend({

  url: "js/data.json"

});

var TableView = (function(){

  var template = JST["contact"];

  function TableView(model) {
    _.extend(this, Backbone.Events);
    this.model = model;
    this.$el = $("<tr />");
    this.listenTo(this.model, "change", function(){
      this.render();
    })
  }

  TableView.prototype = {
    render: function() {
      return this.$el.html( template(this.model.toJSON()) );
    }
  }

  return TableView;

})();

// Header

var HeaderView = (function() {
  var template = JST["thead"];

  function HeaderView(headings) {      
    _.extend(this, Backbone.Events);
      this.headings = headings;
      this.$el = $("<tr />");
      this.$el.addClass("t-head"); 
    }

  HeaderView.prototype = {
    render:function() {
      // map headings into objects that look like { name: "Name"}
      var data = _.map(this.headings, function(heading){
          return {name: heading};
      });
      // loop through them
      _.each(data, function(datum){
        // append th template to tr (this.$el)
        this.$el.append(template(datum)) 
      }, this);
      return this.$el;
    }
  }
  return HeaderView;

})();


$(function(){
  
  $.ajax("js/data.json").done(function(data){


    _.each(data, function(datum){

      var contactModel = new Employee(datum);

      var contactView = new TableView(contactModel);

      $(".employees").append(contactView.render());

    });

  });

});

