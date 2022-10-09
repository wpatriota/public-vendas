<h1 align="center">Sistema para gerenciar doações</h1>

Admin online em <https://demo.api-platform.com>.
API online em <https://demo.api-platform.com>.
Doador cadastro online em <https://demo.api-platform.com>.

[![GitHub Actions](https://github.com/api-platform/demo/workflows/CI/badge.svg)](https://github.com/api-platform/demo/actions?workflow=CI)
[![GitHub Actions](https://github.com/api-platform/demo/workflows/CD/badge.svg)](https://github.com/api-platform/demo/actions?workflow=CD)

## Instalação

[Read the official "Getting Started" guide](https://api-platform.com/docs/distribution).

    $ git clone https://github.com/wpatriota/public-systemdonation.git
    $ cd public-systemdonation
    $ docker compose up -d

Disponível em https://localhost

## What Can I Find In This Demo? 

This demo application contains several things you may be interested.   

### API Testing

All entities used in this project are thoroughly tested. Each test class extends
the `ApiTestCase`, which contains specific API assertions. It will make your tests
much more straightforward than using the standard `WebTestCase` provided by Symfony.

* [Tests documentation](https://api-platform.com/docs/core/testing/)
* [Code in api/tests/](api/tests)

### Custom Data Provider

This example shows how to expose a CSV file as a standard API Platform endpoint.
It also shows how to make this endpoint paginated with an extension.

* [Data providers documentation](https://api-platform.com/docs/core/data-providers/)
* [Code in api/src/DataProvider](api/src/DataProvider)

### Overriding the OpenAPI Specification

This example shows how to document an API endpoint that isn't handled by API Platform.
This "legacy" endpoint is listed and testable like the other ones thanks to the
Swagger interface.
 
* [Overriding the OpenAPI Specification documentation](https://api-platform.com/docs/core/openapi/#overriding-the-openapi-specification)
* [Code in api/src/OpenApi/OpenApiFactory.php](api/src/OpenApi/OpenApiFactory.php)

### Custom Doctrine ORM Filter

This example shows how to implement a custom API filter using Doctrine. It allows
to filter archived items with a GET parameter. There are three modes: 

* no filter (default)
* only archived item (`?archived=1`)
* exclude archived items (`?archived=0`)

Links:

* [Creating Custom Doctrine ORM Filters documentation](https://api-platform.com/docs/core/filters/#creating-custom-doctrine-orm-filters)
* [Code in api/src/Filter](api/src/Filter)

## Contributing

[Read the contributing guide](.github/CONTRIBUTING.md)

## Creditos

Created by [Kévin Dunglas](https://dunglas.fr). Commercial support available at [Les-Tilleuls.coop](https://les-tilleuls.coop).
