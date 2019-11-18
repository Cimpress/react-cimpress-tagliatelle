#### Package deprecation notice

As of 2019-11-18, the team is deprecating this component library because of a newly emergent reliance on internal libraries. With this in mind, the package has been renamed and published internally. All further development of this library, including new features and bug fixes, will continue in the new repository. Thus, this repository will no longer be maintained.

You are welcome to migrate to `@cimpress-technology/react-cimpress-tagliatelle`, sourcing it from the internal repository.

##### What will happen if I do nothing?

You will be using an unmaintained version of the library, which means that no support will be offered.

##### I am an external user without access to the internal repository. What can I do?

Unfortunately, at the time we are unable to provide you with a replacement component library. You may continue using the unmaintained library, albeit at your own risk.


# react-cimpress-tagliatelle

TBD

## Development

1. Clone the repository
    
        git clone https://github.com/Cimpress/react-cimpress-tagliatelle
                
3. Run the following command to download the language translations files. 
        
        npm run build

4. For developing, we use [Storybook](https://github.com/storybooks/storybook). You can run and see
the stories with:
        
        npm run storybook
        
5. Make sure your code passes the linting rules
        
        npm run code-check
        
6. Make sure to update **package.json** with the new version of the package (please follow 
[semantic versioning](https://semver.org/). After, please also update **CHANGELOG.md** file 
with short info for the changes in this new version.   

7. Don't forget to enjoy!
