# Simple Courses API

This API allows you to find QA, AQA, and English courses for your study.

The API is available at `...`

## Endpoints

- [Get all courses](#get-all-courses)
- [Get a course by ID](#get-a-course-by-id)
- [Create a course](#create-a-course)
- [Update a course](#update-a-course)
- [Delete a course](#delete-a-course)

### Get all courses

**`GET /courses`**

Returns the list of courses from all categories.

**Parameters**

| Name     | Type    | In    | Required | Description                                                                                                                                                                                                                                            |
| -------- | ------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `limit`  | integer | query | No       | Specifies the number of results you want to be returned. Must be a positive number between 1 and 75. By default, only 10 courses will be displayed.                                                                                                    |
| `skip`   | integer | query | No       | Specifies the number of results you want to skip. Must be a number between 1 and 75. By default, it will be displayed first 10 courses.                                                                                                                |
| `filter` | string  | query | No       | Specifies the category of courses you want to be returned. It can use all or only some of the types (QA, AQA, ENG), free(true or false), and author(name of author). Parameters should be comma separated. Example: `type:QA,free:false,author:Author` |

**Status codes**

| Status code   | Description                                         |
| ------------- | --------------------------------------------------- |
| 200 OK        | Indicates a successful response.                    |
| 404 Not Found | Indicates that the parameters provided are invalid. |

Example response:

```
{
    "reqId": "186db4185830.2c7e9966128a2",
    "courses": [
        {
            "id": "63fb6a59095315a1a85811f0",
            "title": "Some QA course",
            "author": "Great author",
            "free": false,
            "resource": "https://example.com",
            "category": "AQA"
        },
    ],
    "count": 75
}
```

### Get a course by ID

**`GET /courses/:id`**

Returns a single course by its ID.

**Parameters**

| Name | Type   | In   | Required | Description                                     |
| ---- | ------ | ---- | -------- | ----------------------------------------------- |
| `id` | string | path | Yes      | Specifies the course's id you wish to retrieve. |

**Status codes**

| Status code   | Description                                              |
| ------------- | -------------------------------------------------------- |
| 200 OK        | Indicates a successful response.                         |
| 404 Not found | Indicates that there is no course with the specified id. |

Example response:

```
{
    "reqId": "186db693e570.99e74ba9fb1a3",
    "course": {
        "id": "640f358844c451a3cdcb9084",
        "title": "title",
        "author": "author name",
        "free": true,
        "resource": "https://example.com",
        "category": "QA"
    }
}
```

### Create a course

Creating a new course.

**`POST /courses`**

Creates a new course and returns the data of this new course in the response body.

**Request body**

The request body needs to be in JSON format.

| Name     | Type    | In   | Required | Description                                                                 |
| -------- | ------- | ---- | -------- | --------------------------------------------------------------------------- |
| `author` | string  | body | Yes      | An author of the course. Must be a string with a length between 1 and 50.   |
| `title`  | string  | body | Yes      | A title of the course. Must be a string with a length between 1 and 355.    |
| `site`   | string  | body | Yes      | A resource of the course. Must be a string with a length between 1 and 355. |
| `type`   | string  | body | Yes      | A category of the course. Should be one of these: "AQA", "QA", "ENG".       |
| `isFree` | boolean | body | No       | An information is this course free or not. By default get null.             |

Example request body:

```
{
    "author": "Some awesome author",
    "isFree": true,
    "site": "https://example.com",
    "title": "Course's title",
    "type": "QA"
}
```

**Status codes**

| Status code     | Description                                              |
| --------------- | -------------------------------------------------------- |
| 201 Created     | Indicates that the course has been created successfully. |
| 404 Not found   | The course could not be found.                           |
| 400 Bad request | Some problems with a request body.                       |

### Update a course

Allows to update a course by ID. Some types of courses can't be updated.

**`PUT /courses/:id`**

The request body needs to be in JSON format.

**Parameters**

| Name     | Type    | In   | Required | Description                                                                 |
| -------- | ------- | ---- | -------- | --------------------------------------------------------------------------- |
| `author` | string  | body | Yes      | An author of the course. Must be a string with a length between 1 and 50.   |
| `title`  | string  | body | Yes      | A title of the course. Must be a string with a length between 1 and 355.    |
| `site`   | string  | body | Yes      | A resource of the course. Must be a string with a length between 1 and 355. |
| `type`   | string  | body | Yes      | A category of the course. Should be one of these: "AQA", "QA", "ENG".       |
| `isFree` | boolean | body | No       | An information is this course free or not. By default get null.             |

Example request body:

```
{
    "author": "Some awesome author",
    "isFree": true,
    "site": "https://example.com",
    "title": "Course's title",
    "type": "QA"
}
```

**Status codes**

| Status code     | Description                                              |
| --------------- | -------------------------------------------------------- |
| 200 OK          | Indicates that the course has been updated successfully. |
| 404 Not found   | The course could not be found.                           |
| 400 Bad request | Some problems with a request body.                       |

### Delete a course

Deletes a course by ID. Some types of courses can't be deleted.

**`DELETE /courses/:id`**

**Parameters**

| Name | Type   | In   | Required | Description              |
| ---- | ------ | ---- | -------- | ------------------------ |
| `id` | string | path | Yes      | Specifies the course id. |

**Status codes**

| Status code   | Description                                            |
| ------------- | ------------------------------------------------------ |
| 200 OK        | Indicates that the item has been deleted successfully. |
| 404 Not found | The course could not be found.                         |

Example response:

```
{
    "reqId": "186db6cbce00.0ca9ba202df4e",
    "message": "Course was deleted successfully"
}
```

### Technologies Used

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://www.expresjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [Axios](https://www.npmjs.com/package/axios)
