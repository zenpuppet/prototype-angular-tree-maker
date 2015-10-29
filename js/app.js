var routerApp = angular.module('routerApp', ['ui.router']);


routerApp.constant('routes',
 [


 
 {
  state:"overview",
  def:{
    maincategory:true
  },
 },
 
 {
  state:"features",
  def:{
    maincategory:true,
    childrenCollapsed:false
  },
  children:[
    {
      state:"Viewing Documents",
      def:{
        childrenCollapsed:true
         },
      children:[
      {
        state:"Demos",
        def:{
          childrenCollapsed:true
           },
         children:[
            
             {
                 state:"Basic",
                 def:{ },
               },
         
         ]  
      },
        {
           state:"Cofigure a viewer",
           def:{ },
         },
        {
          state:"Code Samples",
          def:{ },
        },
        {
          state:"API",
          def:{ },
        }
      ]
    },
    {
      state:"OCR-ing Documents",
      def:{ },
    },
    {
      state:"Converting Documents",
      def:{ },
    },
    {
      state:"Compressing Images",
      def:{ },
    },
    {
      state:"Barcodes",
      def:{ },
      children:[
      {
        state:"Read",
        def:{ },
      },
      {
        state:"Write",
        def:{ },
      }
      ]
    },
    {
      state:"Signing Document",
      def:{ },
    },
    {
      state:"Watermarking Documents",
      def:{ },
    },
    {
      state:"Redacting Documents",
      def:{ },
    },
  ]
},
{
  state:"demos",
  def:{
    maincategory:true,
    childrenCollapsed:true
  },
  children:[

    {
      state:"Viewing Documents",
      def:{ 
        childrenCollapsed:false
        },
      children:[
       {
          state:"Converting Documents",
          def:{ },
        },
        {
          state:"Compressing Images",
          def:{ },
        },
        {
          state:"Barcodes",
          def:{ },
          children:[
          {
            state:"Read",
            def:{ },
          },
          {
            state:"Write",
            def:{ },
          }
          ]
        },]
    },
    {
      state:"OCR-ing Documents",
      def:{ },
    },
    {
      state:"Converting Documents",
      def:{ },
    },
    {
      state:"Compressing Images",
      def:{ },
    },
    {
      state:"Barcodes",
      def:{ },
      children:[
      {
        state:"Read",
        def:{ },
      },
      {
        state:"Write",
        def:{ },
      }
      ]
    },
    {
      state:"Signing Document",
      def:{ },
    },
    {
      state:"Watermarking Documents",
      def:{ },
    },
    {
      state:"Redacting Documents",
      def:{ },
    },
  ]
},
   {
       state:"integrations",
        def:{
          maincategory:true,
          childrenCollapsed:false
        },
        children:[
          {
            state:"wordpress",
             def:{ },
          },
          {
            state:"Joomla",
             def:{ },
          },
          {
            state:"Sugarcrm",
             def:{ },
          }

        ]
    },
 {
    state:"tools",
     def:{
       maincategory:true,
       childrenCollapsed:false
     },
     children:[
       {
         state:"Viewer Configurator",
          def:{ },
       },
       {
         state:"Workflow Configurator",
          def:{ },
       },
       {
         state:"Usage Statistics",
          def:{ },
       }
     
     ]
  },
  {
    state:"PRICING",
     def:{
       maincategory:true
     }
  },
  {
      state:"howto",
       def:{
         label:"How To",
         maincategory:true,
         childrenCollapsed:false
       },
       children:[
         {
          state:"viewing-documents",
          def:{
            label:"Viewing Documents", 
          },
          children:[
           {
             state:"Integrating with Your Application",
              def:{ },
           },
           {
             state:"Customizing the Viewer",
              def:{ },
              children:[
                {
                  state:"Customization Recommendations/Guidelines",
                   def:{ },
                },
              ]
           },

          ]
         },
         {
           state:"recognizing content (OCR)",
            def:{ },
         },
         {
           state:"converting documents",
            def:{ },
         },
         {
           state:"read and write barcodes",
            def:{ },
         },
         {
           state:"signing documents",
            def:{ },
         },
         {
           state:"watermarking content",
            def:{ },
         },
         {
           state:"redacting content",
            def:{ },
         },
         {
           state:"searching content",
            def:{ },
         },
         {
           state:"encrypting content",
            def:{ },
         }

       ]
    },
  {
      state:"api",
       def:{
         maincategory:true,
         childrenCollapsed:true,
         fullWidthInterface:true
       },
       children:[
         {
           state:"barcode",
            def:{ },
         },
         {
           state:"document viewing",
            def:{ },
            children:[
              {
                state:"Server side",
                 def:{ },
                 children: [
                 
                 {
                   state:"Viewer Sessions",
                    def:{ },
                 },
                 {
                   state:"Attachments",
                    def:{ },
                 },
                 {
                   state:"HTML5 Viewing",
                    def:{ },
                 },
                 ]
              },
              {
                state:"Client side",
                 def:{ },
              },
            ]
         },
         {
           state:"integrations",
            def:{ },
         }

       ]
    }


]);

routerApp.constant('viewsFolder','/views/partials/');


routerApp.config(function($stateProvider, $urlRouterProvider,routes,viewsFolder) {
  
  //$urlRouterProvider.otherwise('/overview');
        
   var makeStates = function(stateArray,baseState) {
     
      stateArray.forEach(function(route){
        
        
        route.def = route.hasOwnProperty('def') ? route.def : new Object;
        
         
        route.label = route.def.hasOwnProperty('label') ? route.def.label : route.state;
        route.state = baseState ? baseState +  "." + route.state : route.state;
       
         
        var childrenStates = route.hasOwnProperty('children') ? route.children : null;
         
         if (childrenStates) {
           route.def.abstract = true;
           route.def.template = '<ui-view/>';
           route.def.templateUrl = null;
           makeStates([{
             state: 'index',
             def:{
               url: ''
             }
           }],route.state);           
          }
         
         
         route.def.templateUrl = (route.def.templateUrl || route.def.abstract) ? route.def.templateUrl : viewsFolder + route.state.split(".").join("/") + ".html";
         route.def.url = route.def.url ? route.def.url : "/" +  route.state.split(".").join("/") ;
        $stateProvider.state(route.state, route.def);
        
    
         
         if (childrenStates)  makeStates(childrenStates,route.state);

         
       });
     
     console.log($stateProvider);
     
   }
    
  makeStates(routes,"");  
  
        
});

routerApp.controller("dataController",function($scope,$http,routes) {
  $scope.routes =routes;
  $scope.items = [{name: 'one', age: 30 },{ name: 'two', age: 27 },{ name: 'three', age: 50 }];
});


routerApp.controller("mainController",function($scope,$http,routes) {
  $scope.routes =routes;
  
  $scope.apikey = "XXgZig-_aoUFjpwSSwug3wN_188hn_UuhUCMV5GlXW65ARJF9OAKRFQUn4qI2G7o"
  
  $scope.loggedIn = false;
   $scope.loginText = "login"
  $scope.loginLogout = function() {
    $scope.loggedIn = !$scope.loggedIn;
    $scope.loginText = !$scope.loggedIn ? 'login': 'logout';
  }
});



angular.bootstrap(document.body,["routerApp"]);

angular.element(document).ready(function() {
  
  function handleResize() {
  
  var body = document.body,
      html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                         html.clientHeight, html.scrollHeight, html.offsetHeight );
  
          $('.bgWrapper').css({'height':height+'px'});
  }
  $(function(){
          handleResize();

          $(window).resize(function(){
          handleResize();
      });
  });
  
    $('.tree-toggle').click(function () {
    	$(this).parent().parent().parent().children('ul.tree').toggle(200);
    });
    
   $('[data-tree-menu="true"]').click(function () {
    	console.log($(this).parent().children('ul.collapse').toggle(200));
    });
    
     
});

console.log("ASDF");
