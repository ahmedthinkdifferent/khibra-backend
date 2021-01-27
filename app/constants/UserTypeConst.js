class UserTypeConst {
  static STUDENT = "STUDENT";
  static UNIVERSITY = "UNIVERSITY";
  static COMPANY = "COMPANY";

  static getTypes() {
    return [
      UserTypeConst.STUDENT,
      UserTypeConst.COMPANY,
      UserTypeConst.UNIVERSITY,
    ];
  }
}

module.exports = UserTypeConst;
