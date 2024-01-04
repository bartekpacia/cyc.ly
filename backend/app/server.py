from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware import Middleware

from routes.routes_router import routes_router
from users.users_router import users_router


def init_routers(app_: FastAPI) -> None:
    app_.include_router(users_router)
    app_.include_router(routes_router)


# def init_listeners(app_: FastAPI) -> None:
#     # Exception handler
#     @app_.exception_handler(CustomException)
#     async def custom_exception_handler(request: Request, exc: CustomException):
#         return JSONResponse(
#             status_code=exc.code,
#             content={"error_code": exc.error_code, "message": exc.message},
#         )


# def on_auth_error(request: Request, exc: Exception):
#     status_code, error_code, message = 401, None, str(exc)
#     if isinstance(exc, CustomException):
#         status_code = int(exc.code)
#         error_code = exc.error_code
#         message = exc.message

#     return JSONResponse(
#         status_code=status_code,
#         content={"error_code": error_code, "message": message},
#     )


def make_middleware() -> list[Middleware]:
    middleware = [
        Middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        ),
        # Middleware(
        #     AuthenticationMiddleware,
        #     backend=AuthBackend(),
        #     on_error=on_auth_error,
        # ),
        # Middleware(SQLAlchemyMiddleware),
        # Middleware(ResponseLogMiddleware),
    ]
    return middleware


def create_app() -> FastAPI:
    app_ = FastAPI(
        title="Cycly API",
        description="Cycly API",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
        # dependencies=[Depends(Logging)],
        middleware=make_middleware(),
    )
    init_routers(app_=app_)

    return app_


app = create_app()
