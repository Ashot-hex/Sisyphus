import { log } from "console";

//Is in itself an example of a Large Class
export class CodeSmellExamples {
    //#region other examples of code smell
    public static DuplicateCode = class {
        //the for loop can be extracted in a "doSomeOperation(number[]): void" private method
        public foo(): void {
            const list = [1, 2, 3, 4];
            for (const i of list) {
                justSomeOperation(i % 2 === 0);
            }
        }
        public bar(): void {
            const list = [5, 6, 7, 8, 9];
            for (const i of list) {
                justSomeOperation(i % 2 === 0);
            }
        }
    };
    public static LongFunctionAndSrpViolation = class {
        public tooLongButStepsAreCommented_saveUser(userInput: any): void {
            // Step 1: Handle user input
            const user = {
                name: userInput.name.trim(),
                email: userInput.email.trim(),
                password: userInput.password,
            };

            // Step 2: Validate user data
            if (!user.name) {
                throw new Error("Name is required");
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!user.email || !emailRegex.test(user.email)) {
                throw new Error("Valid email is required");
            }
            if (!user.password || user.password.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }

            // Step 3: Hash the password
            const hashedPassword = `hashed_${user.password}`; // Won't bother actually hashing

            // Step 4: Create user object for database
            const dbUser = {
                name: user.name,
                email: user.email,
                password: hashedPassword,
                createdAt: new Date(),
            };

            // Step 5: Save user to database
            this.saveToDatabase(dbUser);

            // Step 6: Send welcome email
            this.sendWelcomeEmail(user.email);
        }
        public tooLongAndStepsAreNotCommented_saveUser(userInput: any): void {
            const user = {
                name: userInput.name.trim(),
                email: userInput.email.trim(),
                password: userInput.password,
            };

            if (!user.name) {
                throw new Error("Name is required");
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!user.email || !emailRegex.test(user.email)) {
                throw new Error("Valid email is required");
            }
            if (!user.password || user.password.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }

            const hashedPassword = `hashed_${user.password}`; // Won't bother actually hashing

            const dbUser = {
                name: user.name,
                email: user.email,
                password: hashedPassword,
                createdAt: new Date(),
            };

            this.saveToDatabase(dbUser);
            this.sendWelcomeEmail(user.email);
        }
        //I hope no developper in their right mind would actually put these two procedures in the function above
        private saveToDatabase(user: any): void {
            // Simulate saving user to database
            justSomeOperation(user);
        }
        private sendWelcomeEmail(email: string): void {
            // Simulate sending email
            justSomeOperation(email);
        }
    };
    public static MagicValues = class {
        public getUserData(data: any): object {
            const userData = data["rzgjzng"]; //Random code we can't even derive meaning from
            return userData !== undefined ? userData : {};
        }
        public getDiscountedPrice(price: number): number {
            //we can guess that there is a 10% discount, but that's still not ideal
            return price * 0.9;
        }
    };
    public static LongParameterList = class {
        //Could be a list, or an array of 5 elements in a language with static arrays
        public foo(
            param1: string,
            param2: string,
            param3: string,
            param4: string,
            param5: string
        ): void {
            justSomeOperation("param1", param1);
            justSomeOperation("param2", param2);
            justSomeOperation("param3", param3);
            justSomeOperation("param4", param4);
            justSomeOperation("param5", param5);
        }
        //Could be a User object in itself, with even a Location sub-object
        public bar(
            firstname: string,
            lastname: string,
            email: string,
            phoneNumber: string,
            address: string,
            city: string,
            country: string
        ): void {
            justSomeOperation("firstname: ", firstname);
            justSomeOperation("lastname: ", lastname);
            justSomeOperation("email: ", email);
            justSomeOperation("phoneNumber: ", phoneNumber);
            justSomeOperation("address: ", address);
            justSomeOperation("city: ", city);
            justSomeOperation("country: ", country);
        }
    };
    public static DataClumps = class {
        //Kinda similar to LongParameterList
        public foo(): void {
            const username = justSomeOperation("getUsername");
            const login = justSomeOperation("getLogin");
            const password = justSomeOperation("getPassword");
            const firstname = justSomeOperation("getFirstname");
            const lastname = justSomeOperation("getLastname");

            justSomeOperation(username, login, password, firstname, lastname);
        }
    };
    public static InconsistentNaming = class {
        //1st problem is the lack of consistency,
        //2nd problem is the fact that we don't follow the guidelines.
        //Even though there are not official coding style guidelines for every languages, there usually are de facto conventions
        public Foobar(): void { }
        public guydebarbaz(): void { }
        public quxQuux(): void { }
        public CorgeGrault(): void { }
        public GARPLY_WALDO(): void { }
        public Pred_Plugh(): void { }
        public xyzzy_thud(): void { }
    };
    public static CommentedOutCode = class {
        //Commented out code is not that much of a problem while coding, but shouldn't be in a commit
        public bar(): void {
            const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (const i of list) {
                // justSomeOperation(i % 2 === 0);
                justSomeOperation(i % 3 !== 0);
            }
        }
    };
    public static OverNesting = class {
        //We could use guard clauses to limit the nesting,
        //The code's flow can be harder to follow with this much nesting too
        public validateUser(user: any): boolean {
            if (user.name) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (user.email && emailRegex.test(user.email)) {
                    if (user.password && user.password.length < 8) {
                    } else {
                        throw new Error("Password must be at least 8 characters long");
                    }
                } else {
                    throw new Error("Valid email is required");
                }
            } else {
                throw new Error("Name is required");
            }

            return true;
        }
    };
    //#endregion other examples of code smell

    //#region user related mock methods
    public userLogin(): void {
        justSomeOperation("userLogin");
    }
    public userLogout(): void {
        justSomeOperation("userLogout");
    }
    public authentificateUser(): void {
        justSomeOperation("authentificateUser");
    }
    public validateUser(): void {
        justSomeOperation("validateUser");
    }
    //#endregion user related mock methods
    //#region database related mock methods
    public connectToDatabase(): void {
        justSomeOperation("connectToDatabase");
    }
    public sendDatabaseQuery(): void {
        justSomeOperation("sendDatabaseQuery");
    }
    public executeDatabaseCommands(): void {
        justSomeOperation("executeDatabaseCommands");
    }
    //#endregion database related mock methods
}

function justSomeOperation(...args: any): any[] {
    return args;
}