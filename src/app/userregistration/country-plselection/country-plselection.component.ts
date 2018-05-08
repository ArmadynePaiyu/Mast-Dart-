import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-plselection',
  templateUrl: './country-plselection.component.html',
  styleUrls: ['./country-plselection.component.css']
})
export class CountryPlselectionComponent implements OnInit {
 
  cntryPLData = {
    "data":
      {
        "country":
          [
            {
              category:'North America',
              options:['Canada','Global Pricing','United America']
            },
            {
              category:'EMEA',
              options:['Albania',
                'Algeria',
                'Andorra',
                'Angola',
                'Austria',
                'Bahrain',
                'Belarus',
                'Belgium',
                'Benin',
                'Bosnia and Herzegovina',
                'Botswana',
                'Bulgaria',
                'Burkina Faso',
                'Burundi',
                'Cameroon',
                'Cape Verde',
                'Central African Republic',
                'Chad',
                'Comoros',
                'Croatia',
                'Cyprus',
                'Czech Republic',
                'Democratic Republic of the Congo',
                'Denmark',
                'Djibouti',
                'Egypt',
                'Equatorial Guinea',
                'Eritrea',
                'Estonia',
                'Ethiopia',
                'Faroe Islands',
                'Finland',
                'France',
                'Gabon',
                'Gambia',
                'Georgia',
                'Germany',
                'Ghana'
                ]
            },
            {
              category:'Latin America',
              options:['Canada','Global Pricing','United America']
            },
            {
              category:'Asia Pacific',
              options:['Canada','Global Pricing','United America']
            }
          ]
      },
    "productLines":
      [
        {
          category:'North America',
          options:['Canada','Global Pricing','United America']
        },
        {
          category:'EMEA',
          options:['Albania',
            'Algeria',
            'Andorra',
            'Angola',
            'Austria',
            'Bahrain',
            'Belarus',
            'Belgium',
            'Benin',
            'Bosnia and Herzegovina',
            'Botswana',
            'Bulgaria',
            'Burkina Faso',
            'Burundi',
            'Cameroon',
            'Cape Verde',
            'Central African Republic',
            'Chad',
            'Comoros',
            'Croatia',
            'Cyprus',
            'Czech Republic',
            'Democratic Republic of the Congo',
            'Denmark',
            'Djibouti',
            'Egypt',
            'Equatorial Guinea',
            'Eritrea',
            'Estonia',
            'Ethiopia',
            'Faroe Islands',
            'Finland',
            'France',
            'Gabon',
            'Gambia',
            'Georgia',
            'Germany',
            'Ghana'
            ]
        },
        {
          category:'Latin America',
          options:['Canada','Global Pricing','United America']
        },
        {
          category:'Asia Pacific',
          options:['Canada','Global Pricing','United America']
        }
      ]
  }
  constructor() { }

  ngOnInit() {
  }
  
}
