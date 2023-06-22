import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import userList from "./users.json";
import { User } from "features/models";
import { PaginationResponse } from "./pagination-response.type";
import { ErrorResponse } from "./error-response.type";
import { omit, sortBy as lodashSortBy } from "lodash";
import { authenticate } from "./authenticate";

type UserListResponse = PaginationResponse<User>;

export async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse<UserListResponse | ErrorResponse>
) {
  if (req.method?.toLowerCase() !== "get") {
    return res.status(HttpStatusCode.NotFound).json({
      status: HttpStatusCode.NotFound,
      message: "Api endpoint not found",
    });
  }

  if (!authenticate(req)) {
    return res.status(HttpStatusCode.Unauthorized).json({
      status: HttpStatusCode.Unauthorized,
      message: "Unauthorized",
    });
  }

  const page = Number(req.query.page || "1");
  const limit = Math.min(Math.max(Number(req.query.limit || "10"), 1), 25);
  const search = (req.query.search as string) || "";

  let users = userList as User[];
  if (search) {
    users = users.filter((user) =>
      user.name
        ? user.name?.toLowerCase().search(search.toLowerCase()) >= 0
        : false
    );
  }

  const { sortBy, sortOrder } = req.query;

  if (sortBy && sortOrder) {
    users = lodashSortBy(users, sortBy as string);
    if (sortOrder === "desc") {
      users = users.reverse();
    }
  }

  const { isActive } = req.query;
  if (isActive) {
    const active = (isActive as string).toLowerCase() === "true";
    users = users.filter((user) => user.isActive === active);
  }

  const totalPages = Math.ceil(users.length / limit);
  const totalDocs = users.length;
  const pageStart = (page - 1) * limit;
  const pageEnd = (page - 1) * limit + limit;
  const docs = users
    .slice(pageStart, pageEnd)
    .map((user) => omit(user, ["password"]));
  const hasNext = pageEnd < users.length;
  const hasPrev = pageStart > 0;

  // simulating some network delay
  return new Promise((resolve, _) => {
    setTimeout(() => {
      res.status(HttpStatusCode.Ok).json({
        docs,
        page,
        limit,
        totalPages,
        totalDocs,
        hasNext,
        hasPrev,
      });
      resolve(null);
    }, 100);
  });
}
