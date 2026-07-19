<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            'manage users',
            'view appointments',
            'book appointments',
            'manage medical records',
            'view billing',
            'manage billing',
            'dispense medication'
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'web');
        }

        // Create Roles and Assign Permissions
        Role::findOrCreate('Super Admin', 'web');
        
        $doctor = Role::findOrCreate('Doctor', 'web');
        $doctor->givePermissionTo(['view appointments', 'manage medical records']);

        $receptionist = Role::findOrCreate('Receptionist', 'web');
        $receptionist->givePermissionTo(['view appointments', 'book appointments', 'view billing']);

        $patient = Role::findOrCreate('Patient', 'web');
        $patient->givePermissionTo(['view appointments', 'book appointments']);
    }
}