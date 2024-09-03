/** Sexo */
export enum Gender {
    Male,
    Female,
    Other
}

/** Status */
export enum Status {
    Active,
    Inactive,
    Archived,
    Suspended,
    Transferred,
    Graduated,
    Paid,
    Unpaid
}

/** Status de Pagamento */
export enum PaymentStatus {
    Unpaid,
    Paid,
    Partial,
    Overdue
}

/** Grau de Educação */
export enum EducationLevel { 
    HighSchool,
    College,
    Masters,
    PhD,
    Graduated,
    MiddleSchool,
    Elementary,
    University,
    Postgraduate,
    Undergraduate,
    Doctorate,
    Master,
    Bachelor,
    Associate,
    Professional,
    Other
}

/** Modelos de Cursos */
export enum CourseModel {
    FullTime,
    PartTime,
    DistanceLearning,
    Online,
    Immersive,
    Remote,
    Virtual,
    InstructorLed,
    Tutoring,
    Workshop,
    Seminar,
    Conference,
    Collaborative,
    Other
}

/** Tipos de Cursos */
export enum CourseType {
    Full,
    Complementary,
    Elective,
    ProfessionalDevelopment,
    Certificate,
    MasterClass,
    Other
}

/** Grau de Parentesco - Parente / Estudante */
export enum ParentRelationship {
    Father,
    Mother,
    Sibling,
    Grandparent,
    Uncle,
    Aunt,
    Nephew,
    Niece,
    Cousin,
    Inlaw,
    Friend,
    Guardian,
    Other
}

/** Preferências de Contato */
export enum PreferenceContact {
    Phone,
    SMS,
    WhatsApp,
    FaceTime,
    Email,
    Text,
    Video,
    Other
}

/** Tipos de Instituição */
export enum InstitutionType {
    Private,
    Public,
    Community,
    University,
    College,
    Vocational,
    HighSchool,
    MiddleSchool,
    Elementary,
    TrainingCenter,
    Other
}

/** Tipos de Subscrição */
export enum SubscriptionType {
    Active,
    Inactive,
    Archived,
    Cancelled,
    Expired,
    Suspended
}

/** Tipos de Logins */
export enum UserType {
    Admin,
    Instructor,
    Teacher,
    Guest
}