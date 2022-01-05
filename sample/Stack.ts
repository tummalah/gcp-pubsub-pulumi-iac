import * as pulumi from "@pulumi/pulumi"

export class Stack {

    static getStack(): string {
      return  pulumi.getStack()
    }

}